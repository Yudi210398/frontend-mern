import React, { Fragment, useState } from "react";

function ImagePriview(props) {
  const [lihat, setLihat] = useState(null);

  const reader = new FileReader();

  reader.onload = () => {
    setLihat(reader.result);
  };
  if (props.gambar.name) {
    reader.readAsDataURL(props.gambar);
  }
  return (
    <Fragment>
      <img src={lihat} alt="lihat" width="200px" height="200px" />
    </Fragment>
  );
}

export default ImagePriview;
