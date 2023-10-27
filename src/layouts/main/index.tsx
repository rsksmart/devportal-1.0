import React, {createContext, PropsWithChildren} from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Container from "../../components/UI/container";
import Subscribe from "../../components/subscribe";

interface Props {
  pathname: string;
  href: string;
}

export const PageContext = createContext<{ href: string }>({ href: '' });

const MainLayout = ({children, pathname, href}: PropsWithChildren<Props>) => {
  return (
    <>
      <Header/>
      <Container>
        <div className="page-main row">
          <Sidebar pathname={pathname} className="col col-12 col-lg-3"/>
          <div className="col col-12 col-lg-9">
            <div className="page-content">
              <PageContext.Provider value={{ href }}>
                {children}
              </PageContext.Provider>
            </div>
          </div>
          <div className="col-col-12">
            <Subscribe />
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}

export default MainLayout;
