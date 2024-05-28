// components/VideoPlayer

export default function VideoPlayer({ url }) {
  return (
    <iframe src={url} width={500} height={500} allowFullScreen loading="lazy" />
  );
}
