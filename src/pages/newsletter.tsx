import * as React from "react"
import type {HeadFC} from "gatsby"
import BeforeContent from "../components/before-content";
import MainLayout from "../layouts/main";

const NewsletterPage = () => {
  return (
    <MainLayout pathname={'/'} href={'/'}>
      <BeforeContent/>
      <h1 className="mt-4">Newsletter</h1>
      <div className="newsletter-page">
        <>
          <form action="https://rsk.us15.list-manage.com/subscribe/post?u=f52247d792ffe22c6f7be1379&amp;id=a7030f092b"
                method="post" id="newsletter-form" className="validate" target="_blank" noValidate>

            <table className="table newsletter">

              <tr>
                <td>
                  <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                </td>
                <td>
                  <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-FNAME">First Name </label>
                </td>
                <td>
                  <input type="text" value="" name="FNAME" className="" id="mce-FNAME"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-LNAME">Last Name </label>
                </td>
                <td>
                  <input type="text" value="" name="LNAME" className="" id="mce-LNAME"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-JOB">Job Title </label>
                </td>
                <td>
                  <input type="text" value="" name="JOB" className="" id="mce-JOB"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-COMPANY">Company Name or School </label>
                </td>
                <td>
                  <input type="text" value="" name="COMPANY" className="" id="mce-COMPANY"/>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-LANGUAGE">Language </label>
                </td>
                <td>
                  <select name="LANGUAGE" className="" id="mce-LANGUAGE">
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                    <option value="Português">Português</option>
                    <option value="简体中文">简体中文</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Profile</strong>
                </td>
                <td>
                  <ul style={{listStyle: "none"}}>
                    <li><input type="checkbox" value="1" name="group[12432][1]" id="mce-group[12432]-12432-0"/><label
                      htmlFor="mce-group[12432]-12432-0">Student</label></li>
                    <li><input type="checkbox" value="2" name="group[12432][2]" id="mce-group[12432]-12432-1"/><label
                      htmlFor="mce-group[12432]-12432-1">Developer</label></li>
                    <li><input type="checkbox" value="4" name="group[12432][4]" id="mce-group[12432]-12432-2"/><label
                      htmlFor="mce-group[12432]-12432-2">Enterprise</label></li>
                    <li><input type="checkbox" value="8" name="group[12432][8]" id="mce-group[12432]-12432-3"/><label
                      htmlFor="mce-group[12432]-12432-3">Government</label></li>
                    <li><input type="checkbox" value="16" name="group[12432][16]" id="mce-group[12432]-12432-4"/><label
                      htmlFor="mce-group[12432]-12432-4">Entrepreneur</label></li>
                    <li><input type="checkbox" value="32" name="group[12432][32]" id="mce-group[12432]-12432-5"/><label
                      htmlFor="mce-group[12432]-12432-5">None of the above</label></li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="mce-SKILLS">Skills </label>
                </td>
                <td>
                  <ul style={{listStyle: "none"}}>
                    <li><label><input type="checkbox" name="skillscb" value="Solidity"/>Solidity</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Front-End"/>Front-End</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Back-End"/>Back-End</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Full Stack"/>Full Stack</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Technical Manager"/>Technical Manager</label>
                    </li>
                    <li><label><input type="checkbox" name="skillscb" value="Graphic Designer"/>Graphic Designer</label>
                    </li>
                    <li><label><input type="checkbox" name="skillscb" value="UX"/>UX</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Javascript"/>Javascript</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Java"/>Java</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Python"/>Python</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Go"/>Go</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Rust"/>Rust</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Ruby"/>Ruby</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Mobile"/>Mobile</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="HTML"/>HTML</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Data"/>Data</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Security"/>Security</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="IT"/>IT</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="Dev Ops"/>Dev Ops</label></li>
                    <li><label><input type="checkbox" name="skillscb" value="QA Engineer"/>QA Engineer</label></li>
                  </ul>

                  <input type="hidden" value="" name="SKILLS" className="" id="mce-SKILLS"/>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                         className="button footer-button rounded"/>
                </td>
              </tr>

            </table>

          </form>
        </>
      </div>
    </MainLayout>
  )
}

export default NewsletterPage;

export const Head: HeadFC = () => <title>RSK Developers Portal - Newsletter</title>
