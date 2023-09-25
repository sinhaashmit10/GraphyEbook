const fetchImageFromUnsplash = async (subject) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?query=${subject}&orientation=landscape&client_id=TfFspVHomEw5kDLWlGdD5viE3UGoRZGn9810NF6U1M0`
      );
      if (response.data.urls && response.data.urls.regular) {
        // Assuming you have an image element with the ID "coverImage"
        const coverImage = document.getElementById('coverImage');
        coverImage.src = response.data.urls.regular;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  