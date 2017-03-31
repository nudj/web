import React from 'react'
import style from './home-page.css'

export default (props) => (
  <div className={style.body}>
    <div className={style.background}>
      <div className={style.heroFull}>
        <div className={style.heroBody}>
          <div className={style.container}>
            <div className={style.centered}>
              <h1 className={style.header}>The best jobs aren’t advertised. The best talent isn’t looking. Maybe they just need a nudj.</h1>
            </div>
          </div>
        </div>
        <div className={style.heroFoot}>
          <div className={style.centered}>
            <div className={style.indicator}>&#x1F447;</div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.sectionMedium}>
      <div className={style.heroHead}>
        <div className={style.centered}>
          <h2 className={style.header}>How it works</h2>
          <div className={style.subtitle}>It's so easy, it won't feel like work.</div>
        </div>
      </div>
      <div className={style.heroBody}>
        <div className={style.container}>
          <div className={style.columnsMobile}>
            <div className={style.columnHalf}>
              <h3 className={style.step}>1. Get set-up in seconds</h3>
              <div className={style.detail}>Simply enter a few details about your company, and, hey-presto, your jobs will appear on the nudj network.</div>
            </div>
          </div>
          <div className={style.columnsMobile}>
            <div className={style.columnHalf}>
              <h3 className={style.step}>2. Connect the dots</h3>
              <div className={style.detail}>We'll automatically identify the people most likely to put you in touch with awesome talent, whether they’re in your network or ours.</div>
            </div>
          </div>
          <div className={style.columnsMobile}>
            <div className={style.columnHalf}>
              <h3 className={style.step}>3. Make it personal</h3>
              <div className={style.detail}>Get help tailoring your messages and incentives to ensure those you ask take action.</div>
            </div>
          </div>
          <div className={style.columnsMobile}>
            <div className={style.columnHalf}>
              <h3 className={style.step}>4. Review only the best</h3>
              <div className={style.detail}>Get a curated list of the best applicants and only the juicy details delivered straight to your inbox or ATS of your choice.</div>
            </div>
          </div>
          <div className={style.columnsMobile}>
            <div className={style.columnHalf}>
              <h3 className={style.step}>5. Say goodbye to paperwork</h3>
              <div className={style.detail}>We’ll then handle all the admin and payments so you don’t have to - that's one less thing for you to worry about.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.heroMedium}>
      <div className={style.heroHead}>
        <div className={style.centered}>
          <h2 className={style.header}>How we compare</h2>
          <div className={style.subtitle}>Anyone can say they're the best, so we'll just let the numbers do the talking. &#x1F60F;</div>
        </div>
      </div>
      <div className={style.heroBody}>
        <div className={style.container}>
          <table className={style.table}>
            <thead>
              <tr>
                <th />
                <th className={style.tableHeader}>Recruiter</th>
                <th className={style.tableHeader}>Internal Referrals</th>
                <th className={style.tableHeaderNudj}>nudj*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost of Hire</td>
                <td className={style.tableItem}>£3,000</td>
                <td className={style.tableItem}>£1,000</td>
                <td className={style.tableItemNudj}>£750</td>
              </tr>
              <tr>
                <td>Time to Hire</td>
                <td className={style.tableItem}>55 Days</td>
                <td className={style.tableItem}>29 Days</td>
                <td className={style.tableItemNudj}>20 Days</td>
              </tr>
              <tr>
                <td>Fill Rate</td>
                <td className={style.tableItem}>18%</td>
                <td className={style.tableItem}>40%</td>
                <td className={style.tableItemNudj}>56%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.centered}>
          <div className={style.bodyNudj}>*based on tests with these lovely people.</div>
          <div className={style.columns}>
            <div className={style.column}>
              <img width='250' height='250' className={style.brand} src='/assets/images/mams.png' />
              <img width='250' height='250' className={style.brand} src='/assets/images/ct.png' />
              <img width='250' height='250' className={style.brand} src='/assets/images/mp.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={style.heroMedium}>
      <div className={style.heroHead}>
        <div className={style.centered}>
          <div className={style.centered}>
            <h2 className={style.header}>How much does it cost</h2>
            <div className={style.subtitle}>We will be announcing our pricing very soon, but while we're still in beta it costs...</div>
          </div>
        </div>
        <div className={style.heroBody}>
          <div className={style.centered}>
            <div className={style.headerBold}>
              £0 + referral fee. &#x1F62E;
            </div>
            <div className={style.detail}>So sign-up for beta access today!</div>
            <div className={style.buttons}>
              <a className={style.request} href='/request'>Request access</a>
              <span className={style.padding} />
              <a className={style.outlined} id='open-intercom'>Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className={style.section}>
      <div className={style.centered}>
        <div className={style.footerCopy}>© 2017 <strong>nudj</strong>, All Rights Reserved</div>
        <a className={style.buttonLink} href='https://www.iubenda.com/privacy-policy/8051143' target='_blank'>Privacy</a>
      </div>
    </footer>
  </div>
)
