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