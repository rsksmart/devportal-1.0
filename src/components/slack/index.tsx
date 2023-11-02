import React from "react";
import classnames from "classnames";

interface Props {
  className?: string;
}

const Slack = ({ className }: Props) => {
  return (
    <a className={classnames('slack', className)} href="https://rootstock.io/discord" target="_blank" rel="noopener noreferrer">Join the Rootstock Global Discord Community to
      get the latest updates from the Rootstock Ecosystem!
    </a>
  );
}

export default Slack;