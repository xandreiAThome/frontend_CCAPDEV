import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";

import {
  Dot,
  Ellipsis,
  Heart,
  MessageSquareShare,
  MessageSquareText,
  Terminal,
} from "lucide-react";
import ReactTimeAgo from "react-time-ago";
import { Input } from "~/components/ui/input";
import CommentsCard from "./commentsCard";

interface postsData {
  author: string;
  username: string;
  time: Date;
  views: number;
  content: string;
  reactions: number;
  comments: number;
  reposts: number;
  img: string | null;
  org: string;
  position: string;
}

export default function PostDialog({
  author,
  username,
  time,
  views,
  content,
  reactions,
  comments,
  reposts,
  img,
  org,
  position,
}: postsData) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const dummyComment = {
    author: "zel",
    time: new Date("2022-10-31T09:00:00.594Z"),
    content: "congrats bro! #selfsupport",
    reactions: 4300,
    replies: 500,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex text-base text-justify my-4 flex-col">
          <p className="mb-2">{content}</p>
          <div className="-mx-6">
            {img && <img src={img} alt="image content" className=""></img>}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <div className="flex items-center mt-4">
            <img
              src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              alt="profile"
              width="36"
              height="36"
              className="rounded-full mr-4"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center">
                <p className="text-lg font-bold mr-2">{author}</p>{" "}
                <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                  {org}
                </p>
                <p className="px-2 bg-[#313131] text-white text-xs font-semibold">
                  {position}
                </p>
                <button className="ml-auto text-gray-500">
                  <Ellipsis />
                </button>
              </div>
              <div className="flex items-start">
                <p className="text-gray-400 text-xs">{username}</p>

                <div className="ml-auto flex items-center">
                  <p className="text-gray-400 text-xs">
                    <ReactTimeAgo date={time} locale="en-SG" />
                  </p>
                  <Dot className="text-gray-500" />
                  <p className="text-gray-400 text-xs">
                    {formatter.format(views)} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="flex text-base text-justify flex-col">
          <p className="mb-2">{content}</p>
          <div className="-mx-6">
            {img && <img src={img} alt="image content" className=""></img>}
          </div>
        </div>
        <hr className="-mx-6" />
        <DialogFooter className="sm:justify-center sm:flex-col flex-col">
          <div className="flex justify-between flex-1">
            <div className="flex items-center">
              <button className="mr-2">
                <Heart className="h-6" />
              </button>
              <p className="text-sm">
                <span className="font-bold">
                  {formatter.format(reactions)}{" "}
                </span>
                reactions
              </p>
            </div>

            <div className="flex items-center">
              <button className="mr-2">
                <MessageSquareText className="h-6" />
              </button>
              <p className="text-sm">
                <span className="font-bold">{formatter.format(comments)} </span>
                comments
              </p>
            </div>

            <div className="flex items-center">
              <button className="mr-2">
                <MessageSquareShare className="h-6" />
              </button>
              <p className="text-sm">
                <span className="font-bold">{formatter.format(comments)} </span>
                reposts
              </p>
            </div>
          </div>

          <Input
            placeholder="What's YOUR thoughts on this post?"
            className="text-base md:text-base bg-gray-200 px-8 py-4 mt-6 rounded-3xl !ml-0"
          ></Input>

          <div className="flex flex-col !ml-0">
            <CommentsCard />
            <CommentsCard />
            <CommentsCard />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
