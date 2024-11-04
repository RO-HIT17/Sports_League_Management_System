'use client';
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import withAuth from '../hoc/withAuth';
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Unlock the power of </span>
        <span className={title({ color: "green" })}>Web app name</span>
        <br />
        <span className={title()}>
          txt text text ext
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          text text etxt text text text text text etxt text text text
        </div>
      </div>

      <div className="flex gap-3">
        <NextLink
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/app_content"
        >
          Get Started
        </NextLink>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          View on GitHub
        </Link>
      </div>

    </section>
  );
}

export default withAuth(Home);