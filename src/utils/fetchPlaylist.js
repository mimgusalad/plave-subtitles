const fetchPlaylistItems = async () => {
  const API_KEY = "AIzaSyBgR_nlX6og5FA6WKatAY-bDEFg8nthuD4";
  const PLAYLIST_ID = "PLbdyoOZYSLOq226mMTKcKzYhfY_p3DcTR";
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyeOg2bVzMyFIijQmKmmB_cksy5fciYQUg3mwdjXEXk3mw6lxzfEwSPu06kQ57ezzoUYA/exec";
  const allMembers = ["Yejun", "Noah", "Bamby", "Eunho", "Hamin"];

  const getMembers = (title) => {
    let members = "";
    const membersStr = title.split(/[|｜]/)[2];
    if (membersStr) {
      let foundMembers = [];
      allMembers.forEach((member) => {
        if (membersStr.includes(member)) {
          foundMembers.push(member);
        }
      });
      members = foundMembers.length
        ? foundMembers.join(",")
        : allMembers.join(",");
    } else {
      members = allMembers.join(",");
    }
    return members.toLowerCase();
  };

  const fetchLivestreamDate = async (videoId) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "liveStreamingDetails",
            id: videoId,
            key: API_KEY,
          },
        }
      );
      return (
        response.data.items[0]?.liveStreamingDetails?.actualStartTime || ""
      );
    } catch (error) {
      console.error("Error fetching livestream details:", error);
      return "";
    }
  };

  const sendBatchToSheet = async (batch) => {
    try {
      await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(batch),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPage = async (pageToken = "") => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50, // Adjust this as needed
          playlistId: PLAYLIST_ID,
          pageToken: pageToken,
          key: API_KEY,
        },
      }
    );

    const items = await Promise.all(
      response.data.items.map(async (item) => {
        const title = item.snippet.title;
        const startsWithDate = /^\d{6}/.test(title); // Check if title starts with yyddmm

        if (startsWithDate) {
          return null; // Exclude item
        }

        const livestreamDate = await fetchLivestreamDate(
          item.snippet.resourceId.videoId
        );
        return {
          VideoId: item.snippet.resourceId.videoId,
          Title: title.split(/[|｜]/)[0].trim(),
          Thumbnail: item.snippet.thumbnails.medium.url,
          Date:
            livestreamDate.split("T")[0] ||
            item.snippet.publishedAt.split("T")[0],
          Members: getMembers(title),
          SheetName: "Database",
        };
      })
    );

    const filteredItems = items.filter((item) => item !== null);

    await sendBatchToSheet(filteredItems);

    if (response.data.nextPageToken) {
      await fetchPage(response.data.nextPageToken);
    }
  };

  try {
    await fetchPage();
  } catch (e) {
    console.error(e);
  }
};
