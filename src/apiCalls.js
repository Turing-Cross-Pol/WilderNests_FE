  export const postComment = async (id, description, title, rating) => {
    const comment = {
      campsite_id: id,
      description,
      title,
      rating,
    };
    try {
      const response = await fetch(
        `https://dpcamping-be-stage.herokuapp.com/campsites/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );
      console.log(response.status);
    } catch (error) {
      setMessage(error.message);
    }
  };

  export const postData = async (amenities, name, city, state, description, driving_tips, image_url, lat, lon) => {
    const newCampsite = {
      amenities: amenities.join(', '),
      name,
      city,
      state,
      description,
      driving_tips,
      image_url,
      lat,
      lon,
    };
    try {
      const response = await fetch(
        "https://dpcamping-be-stage.herokuapp.com/campsites/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCampsite),
        }
      );
      console.log(response.status);
    } catch (error) {
      console.error(error.message);
    }
  };