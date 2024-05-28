// components/VideoPlayer.jsx
export default function VideoPlayer({ url }) {
  console.log("video url : ", url);
  return (
    <div className="video-player">
      <iframe
        src={url}
        width="100%"
        height="500"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
