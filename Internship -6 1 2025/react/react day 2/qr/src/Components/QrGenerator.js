import { useState } from 'react';
import "./qr.css"
const getQR = async (url, size, setImage, setLoad) => {
  await new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },1000);
  });
  setImage(
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`
  );
  setLoad(false);
};
const GenerateQR = () => {
  const loader =
    'https://miro.medium.com/v2/resize:fit:828/format:webp/1*jJKlUDkGzezjiFPagzvnuw.gif';
  const [image, setImage] = useState(
    'https://m.media-amazon.com/images/I/61Ii37tfWNL.jpg'
  );
  const [load, setLoad] = useState(false);

  return (
    <div>
      <div className="inputs">
        <input id="inpt" type="URL" placeholder="enter your url"></input>
        <input id="siz" type="number" placeholder="enter size"></input>
      </div>

      <div className="btns">
        <button
          onClick={() => {
            setImage(loader);
            getQR(
              document.getElementById('inpt').value,
              document.getElementById('siz').value,
              setImage,
              setLoad
            );
          }}>
          Generate URL
        </button>
        <button
          onClick={() => {
              const a = document.createElement('a');
              a.download={image}
              a.href=image;
              a.click()
          }}>
          Download
        </button>
      </div>

      {load ? <img src={loader}></img> : <img src={image}></img>}
    </div>
  );
};

export default GenerateQR;
