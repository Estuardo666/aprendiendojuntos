export type SocialPlatform = 'instagram' | 'facebook';

export interface SocialLinkProps {
  platform: SocialPlatform;
  href: string;
  className?: string;
}
