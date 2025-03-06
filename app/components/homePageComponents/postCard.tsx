import {
  CalendarDays,
  ChevronDown,
  Dot,
  Images,
  Send,
  Terminal,
} from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Heart, MessageSquareText, MessageSquareShare } from "lucide-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import PostDialog from "./postDialog";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState, type JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import ReactionsCard from "./reactionsCard";
import { Input } from "../ui/input";
import type {
  postDataInterface,
  authorInterface,
  commentInterface,
} from "~/lib/interfaces";

interface positionsData {
  org: string;
  position: string;
  orgColor: string;
  positionColor: string;
}

TimeAgo.addDefaultLocale(en);

export default function PostCard(props: postDataInterface) {
  const { title, content, media, type, visibility, meta, author, comments } =
    props;

  // Compatibility variables for existing code
  const img = media?.[0];
  const views = 0; // Default value as it's not in the new interface
  const reactions = 0; // Default value as it's not in the new interface
  const commentsNum = comments && Array.isArray(comments) ? comments.length : 0; // Default value as it's not in the new interface
  const reposts = 0; // Default value as it's not in the new interface
  const commentsList: commentInterface[] = []; // Default value as it's not in the new interface
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const navigate = useNavigate();
  const [currPos, setCurrPos] = useState("LSCS+VP");
  const [typeComment, setTypeComment] = useState(false);
  // TEMP
  const positionsTEMP = [
    {
      org: "LSCS",
      position: "VP",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "LSCS",
      position: "RND",
      orgColor: "#220088",
      positionColor: "#313131",
    },
    {
      org: "TLS",
      position: "WEB",
      orgColor: "#007D3F",
      positionColor: "#313131",
    },
    {
      org: "GDSC",
      position: "MKT",
      orgColor: "#FFCD05",
      positionColor: "#313131",
    },
  ];
  const posDIVS = positionsTEMP.map(
    ({ org, position, orgColor, positionColor }: positionsData) => {
      return (
        <DropdownMenuRadioItem value={`${org}+${position}`}>
          <p
            style={{ backgroundColor: orgColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {org}
          </p>
          <p
            style={{ backgroundColor: positionColor }}
            className=" text-white text-xs font-semibold px-2"
          >
            {position}
          </p>
        </DropdownMenuRadioItem>
      );
    }
  );
  return (
    <div className="bg-custom-postcard-white flex flex-col px-6 rounded-xl py-4 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate("/userprofile");
          }}
        >
          <img
            src={author.vanity && author.vanity.display_photo}
            alt="profile"
            width="36"
            height="36"
            className="rounded-full mr-4"
          />
        </button>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center">
            <Button
              onClick={() => {
                navigate("/userprofile");
              }}
              variant="link"
              className="text-lg text-black font-bold mr-2 p-0"
            >
              {author.info.name.first} {author.info.name.last}
            </Button>{" "}
            <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
              LSCS {/** TEMPORARY */}
            </p>
            <p className="px-2 bg-[#313131] text-white text-xs font-semibold">
              VP {/** TEMPORARY */}
            </p>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto text-gray-500">
                  <button>
                    <Ellipsis />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DialogTrigger>
                    {" "}
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DialogTrigger>

                  <DropdownMenuItem className="text-red-500">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                  <DialogTitle>
                    <h1 className="text-2xl">Edit</h1>
                    <h4 className="text-base font-normal">
                      Posting with{" "}
                      <span className="font-bold">
                        La Salle Computer Society - Vice President
                      </span>
                    </h4>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4 flex-col">
                  <div className="flex items-center">
                    <img
                      src={author.vanity.display_photo}
                      alt="profile"
                      width="36"
                      height="36"
                      className="rounded-full mr-4"
                    />
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <p className="text-lg font-bold mr-12">
                          {author.info.name.first} {author.info.name.last}
                        </p>
                        <p className="px-2 bg-[#220088] text-white text-xs font-semibold">
                          LSCS {/** TEMPORARY */}
                        </p>
                        <p className="px-2 bg-[#313131] text-white text-xs font-semibold mr-2">
                          VP {/** TEMPORARY */}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button>
                              <ChevronDown className="font-extrabold" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              Panel Position
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={currPos}
                              onValueChange={setCurrPos}
                            >
                              {posDIVS}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {author.info.username}
                      </p>
                    </div>
                  </div>{" "}
                  <textarea
                    name="content"
                    id="content"
                    placeholder="Use “/” to add components"
                    rows={5}
                    className="bg-gray-100 rounded-2xl p-4 border-gray-200 border focus:outline-lasalle-green outline-none"
                  >
                    {content.text}
                  </textarea>
                </div>
                <DialogFooter className="sm:justify-between items-center">
                  <Button className="bg-lasalle-green rounded-3xl text-lg px-6">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-start">
            <p className="text-gray-400 text-xs">{author.info.username}</p>

            <div className="ml-auto flex items-center">
              <p className="text-gray-400 text-xs">
                <ReactTimeAgo date={meta.created_at} locale="en-SG" />
              </p>
              <Dot className="text-gray-500" />
              <p className="text-gray-400 text-xs">
                {formatter.format(views)} views
              </p>
            </div>
          </div>
        </div>
      </div>

      {/** CONTENT */}
      <PostDialog
        title={title}
        content={content}
        media={media}
        type={type}
        visibility={visibility}
        meta={meta}
        author={author}
        comments={comments}
      />

      <hr className="-mx-6" />

      <div className="flex items-center mt-4 justify-between gap-4">
        <div className="flex items-center">
          <ReactionsCard reactions={reactions} />
        </div>

        <button
          className="flex items-center hover:bg-slate-200 hover:rounded-md px-2 hover:cursor-pointer gap-2"
          onClick={() => setTypeComment(!typeComment)}
        >
          <MessageSquareText className="h-[28px] w-[27.45px]" />

          <p className="text-sm">
            <span className="font-bold">{12} </span>
            {commentsNum}
          </p>
        </button>

        <div className="flex items-center hover:cursor-pointer hover:bg-slate-200 hover:rounded-md px-2">
          <button className="mr-2">
            <MessageSquareShare className="h-[28px] w-[27.45px]" />
          </button>
          <p className="text-sm">
            <span className="font-bold">{formatter.format(commentsNum)} </span>
            reposts
          </p>
        </div>
      </div>
      {typeComment && (
        <div className="flex relative">
          <Input
            placeholder="What's YOUR thoughts on this post?"
            className="text-base md:text-base bg-gray-200 px-8 py-4 mt-4 rounded-3xl !ml-0"
          ></Input>
          <button>
            <Send className="absolute bottom-2 m-auto right-4 text-gray-500 h-5"></Send>
          </button>
        </div>
      )}
    </div>
  );
}
