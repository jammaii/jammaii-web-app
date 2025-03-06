'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Share2Icon } from 'lucide-react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { useToast } from '@/components/ui/use-toast';
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  ThreadsIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
  BlueskyIcon
} from 'react-share';
import { T } from '@/components/typography';

export const ProjectShareDialog = () => {
  const [open, setOpen] = useState(false);
  const { toastSuccess } = useToast();
  const currentUrl = window.location.href;
  const title = 'Buy premium assets from Jammaii';

  const onCopy = () => {
    toastSuccess({ message: 'Copied!' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-4">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input value={currentUrl} disabled />
          <Button
            onClick={() =>
              copy(currentUrl, {
                onCopy
              })
            }
          >
            Copy
          </Button>
        </div>
        <div className="flex gap-4">
          <FacebookShareButton
            htmlTitle={title}
            url={currentUrl}
            children={<FacebookIcon className="h-8 w-8" round />}
          />
          <TwitterShareButton
            title={title}
            url={currentUrl}
            children={<TwitterIcon className="h-8 w-8" round />}
          />
          <WhatsappShareButton
            title={title}
            url={currentUrl}
            children={<WhatsappIcon className="h-8 w-8" round />}
          />
          <TelegramShareButton
            title={title}
            url={currentUrl}
            children={<TelegramIcon className="h-8 w-8" round />}
          />
          <EmailShareButton
            title={title}
            url={currentUrl}
            children={<EmailIcon className="h-8 w-8" round />}
          />
          <ThreadsShareButton
            title={title}
            url={currentUrl}
            children={<ThreadsIcon className="h-8 w-8" round />}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
