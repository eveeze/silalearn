// components/VideoPlayer.jsx
export default function VideoPlayer({ url }) {
  console.log("video url : ", url);
  return (
    <div className="video-player">
      <iframe
        src={url}
        allowFullScreen
        loading="lazy"
        className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px]"
      />
    </div>
  );
}
