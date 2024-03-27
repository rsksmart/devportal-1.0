import React from "react";
import {Link} from "gatsby";

import {FooterMenu} from "./menu";
import Container from "../UI/container";
import {NavLink} from "../header/menu";

const menu1: NavLink[] = [
  {
    label: 'Whitepaper'
  },
  {
    label: 'Original Whitepaper',
    link: 'https://rootstock.io/rsk_white_paper-original.pdf',
    external: true,
    subItem: true
  },
  {
    label: 'Updated Whitepaper',
    link: 'https://rootstock.io/static/a79b27d4889409602174df4710102056/RS-whitepaper.pdf',
    external: true,
    subItem: true
  },
  {
    label: 'RIF Whitepaper',
    link: 'https://rootstock.io/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf',
    external: true,
    subItem: true
  }
];


const menu2: NavLink[] = [
  {
    label: 'Resources'
  },
  {
    label: 'Merged Mining',
    link: 'https://rootstock.io/mine-btc-with-rootstock/',
    external: true,
    subItem: true
  },
  {
    label: 'Rootstock Explorer',
    link: 'https://explorer.rootstock.io/',
    external: true,
    subItem: true
  },
  {
    label: 'About RootstockLabs',
    link: 'https://rootstocklabs.com',
    external: true,
    subItem: true
  },
  {
    label: 'Blog',
    link: 'https://blog.rootstock.io/',
    external: true,
    subItem: true
  }
];


const Footer = () => {
  return (
    <footer className="footer py-6">
      <Container>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 mb-8 mb-lg-0">
            <h2 className="h3 text-black d-flex flex-column align-items-start">
              <span className="bg-pink mb-2 p-2 letter-spacing-6">Build</span>
              <span className="bg-orange p-2 letter-spacing-6">Together</span>
            </h2>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-6 ">
            <div className="row d-flex justify-content-end">
            <div className="col-6 col-md-6 col-lg-3">
                <FooterMenu items={menu1}/>
              </div>
            <div className="col-6 col-md-6 col-lg-3">
                <FooterMenu items={menu2}/>
            </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center">
              <a className="me-5 zg-social-icon" aria-label="Discord"
                 href="https://discord.com/invite/fPerbqcWGE"
                 target='_blank'
                 rel="noopener noreferrer">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M27.0893 5.54093C25.0498 4.60508 22.8626 3.9156 20.5759 3.5207C20.5342 3.51308 20.4926 3.53212 20.4712 3.57022C20.1899 4.0705 19.8783 4.72317 19.6601 5.23616C17.2005 4.86794 14.7536 4.86794 12.3444 5.23616C12.1262 4.71177 11.8033 4.0705 11.5208 3.57022C11.4993 3.5334 11.4577 3.51435 11.4161 3.5207C9.13055 3.91434 6.94341 4.60382 4.90258 5.54093C4.88491 5.54854 4.86977 5.56125 4.85972 5.57775C0.711189 11.7756 -0.425267 17.821 0.13224 23.7916C0.134763 23.8208 0.15116 23.8487 0.173864 23.8665C2.91094 25.8765 5.56228 27.0968 8.16437 27.9056C8.20602 27.9183 8.25014 27.9031 8.27664 27.8688C8.89217 27.0283 9.44086 26.1419 9.9113 25.2099C9.93906 25.1553 9.91256 25.0905 9.85582 25.069C8.98551 24.7388 8.1568 24.3363 7.35964 23.8792C7.29659 23.8424 7.29154 23.7522 7.34954 23.709C7.5173 23.5833 7.68509 23.4525 7.84527 23.3204C7.87425 23.2963 7.91464 23.2912 7.94871 23.3065C13.1857 25.6975 18.8554 25.6975 24.0306 23.3065C24.0647 23.29 24.1051 23.2951 24.1353 23.3192C24.2955 23.4512 24.4633 23.5833 24.6323 23.709C24.6903 23.7522 24.6865 23.8424 24.6235 23.8792C23.8263 24.3452 22.9976 24.7388 22.126 25.0677C22.0693 25.0893 22.044 25.1553 22.0718 25.2099C22.5523 26.1406 23.101 27.0269 23.7052 27.8676C23.7304 27.9031 23.7758 27.9183 23.8175 27.9056C26.4322 27.0968 29.0835 25.8765 31.8206 23.8665C31.8445 23.8487 31.8597 23.822 31.8622 23.7928C32.5294 16.8902 30.7447 10.8943 27.1309 5.57901C27.1221 5.56125 27.107 5.54854 27.0893 5.54093ZM10.6934 20.1561C9.11666 20.1561 7.81751 18.7086 7.81751 16.9309C7.81751 15.1532 9.09147 13.7057 10.6934 13.7057C12.3078 13.7057 13.5944 15.1659 13.5692 16.9309C13.5692 18.7086 12.2952 20.1561 10.6934 20.1561ZM21.3263 20.1561C19.7497 20.1561 18.4505 18.7086 18.4505 16.9309C18.4505 15.1532 19.7244 13.7057 21.3263 13.7057C22.9408 13.7057 24.2274 15.1659 24.2022 16.9309C24.2022 18.7086 22.9408 20.1561 21.3263 20.1561Z"
                    fill="currentColor"/>
                </svg>
              </a>
              <a className="me-5 zg-social-icon" aria-label="Twitter" href="https://twitter.com/rootstock_io"
                 target="_blank"
                 rel="noopener noreferrer">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M10.0634 29.0007C22.1389 29.0007 28.7437 18.9962 28.7437 10.3204C28.7437 10.0362 28.7437 9.75333 28.7245 9.47173C30.0094 8.54233 31.1185 7.39157 32 6.07333C30.8019 6.60453 29.5307 6.95273 28.2291 7.10629C29.5998 6.28587 30.6255 4.99533 31.1155 3.47493C29.8268 4.23974 28.4168 4.7787 26.9466 5.06853C25.9567 4.01596 24.6475 3.31898 23.2216 3.08544C21.7957 2.8519 20.3326 3.09481 19.0586 3.7766C17.7847 4.45838 16.771 5.54103 16.1743 6.85699C15.5777 8.17296 15.4314 9.64888 15.7581 11.0564C13.1479 10.9254 10.5943 10.2471 8.26327 9.06533C5.9322 7.88359 3.87568 6.22488 2.2272 4.19685C1.38764 5.64218 1.1305 7.35315 1.50813 8.98141C1.88577 10.6097 2.86979 12.0328 4.25984 12.961C3.21498 12.9304 2.19286 12.6485 1.28 12.1392V12.2224C1.28041 13.7382 1.80513 15.2072 2.76516 16.3803C3.72519 17.5533 5.06141 18.3581 6.5472 18.6583C5.58064 18.9219 4.5665 18.9605 3.58272 18.7709C4.00242 20.0754 4.81924 21.216 5.91898 22.0335C7.01873 22.851 8.34643 23.3044 9.71648 23.3303C8.35525 24.4003 6.79642 25.1913 5.12917 25.6583C3.46191 26.1252 1.71895 26.2589 0 26.0516C3.00244 27.9783 6.4959 29.0003 10.0634 28.9956"
                    fill="currentColor"/>
                </svg>
              </a>
              <a className="me-5 zg-social-icon" aria-label="Telegram" href="https://t.me/rskofficialcommunity"
                 target="_blank"
                 rel="noopener noreferrer">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <g clipPath="url(#clip0_2270_6073)">
                    <path
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                      fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M7.24271 15.8314C11.907 13.7993 15.0173 12.4595 16.5736 11.8122C21.0169 9.96408 21.9402 9.64304 22.542 9.63244C22.6744 9.63011 22.9703 9.66291 23.162 9.81846C23.3239 9.9498 23.3684 10.1272 23.3897 10.2518C23.411 10.3763 23.4376 10.66 23.4165 10.8816C23.1757 13.4116 22.1338 19.5512 21.6038 22.3848C21.3795 23.5838 20.9378 23.9858 20.5103 24.0252C19.5812 24.1107 18.8756 23.4111 17.9757 22.8212C16.5675 21.8981 15.7719 21.3235 14.405 20.4227C12.8253 19.3817 13.8494 18.8096 14.7496 17.8745C14.9852 17.6298 19.0791 13.9061 19.1583 13.5683C19.1682 13.5261 19.1774 13.3686 19.0839 13.2855C18.9903 13.2023 18.8522 13.2307 18.7526 13.2533C18.6114 13.2854 16.3617 14.7723 12.0037 17.7141C11.3652 18.1526 10.7868 18.3662 10.2686 18.355C9.69729 18.3427 8.59837 18.032 7.78144 17.7665C6.77944 17.4408 5.98307 17.2686 6.05241 16.7154C6.08853 16.4273 6.4853 16.1326 7.24271 15.8314Z"
                          fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2270_6073">
                      <rect width="32" height="32" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
          <div className="terms">
              <a href="https://rootstock.io/terms-conditions" target="_blank" rel="noopener">Terms & Conditions</a>
              <a href="https://rootstock.io/terms-conditions" target="_blank" rel="noopener">Privacy Policy</a>
            </div>
        </div>
        <div className="row mt-6">
          <div className="col-md-6 col-lg-4 order-2 order-md-1 mt-md-0 mt-6">
            <p className="mb-0 fs-7 opacity-50">© {new Date().getFullYear()}. RootstockLabs. All rights reserved</p>

          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
