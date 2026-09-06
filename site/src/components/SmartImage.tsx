import { useSyncExternalStore, type ImgHTMLAttributes } from "react";
import { resolveImageSrc, subscribeMedia } from "../admin/firebase/mediaStore";

export default function SmartImage({
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const resolved = useSyncExternalStore(
    subscribeMedia,
    () => resolveImageSrc(src),
    () => (src.startsWith("media:") ? "/images/jerusalem.jpg" : src),
  );
  return <img src={resolved} {...props} />;
}
