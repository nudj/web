const React = require('react')
const get = require('lodash/get')
const PropTypes = require('prop-types')
const { Link, NavLink } = require('react-router-dom')

// const { getStyle, setStyles } = require('./header.css')
const { css } = require('@nudj/components/lib/css')

const Logo = require('./nudj-logo')
const style = require('./style.css')

const backgroundColourToBackgroundColorMap = {
  navy: 'navy',
  grey: 'greyLightest',
  midRed: 'midRed',
  white: 'white',
  charcoal: 'charcoal'
}

function convertBackgroundColourToBackgroundColor (backgroundColour) {
  if (backgroundColour) return backgroundColourToBackgroundColorMap[backgroundColour]
}

const Header = (props) => {
  // Backwards compatibility and unifying the API with `Section` and `WobblyBox`
  const backgroundColor = props.backgroundColor || convertBackgroundColourToBackgroundColor(props.backgroundColour)

  return (
    <div className={css(backgroundColor && style[backgroundColor])}>
      <nav className={css(style.nav)}>
        <div className={css(style.navLeft)}>
          <Link
            to='/'
            className={css(style.homeLink)}
          >
            <Logo className={css(style.logo)} colourName='currentColor' />
          </Link>
        </div>
        <div className={css(style.navRight)}>
          <NavLink
            to='/'
            className={css(style.link)}
            activeClassName={css(style.activeLink)}
            exact
          >
            Employers
          </NavLink>
          <NavLink
            to='/talent'
            className={css(style.link)}
            activeClassName={css(style.activeLink)}
          >
            Talent
          </NavLink>
          <NavLink
            to='/about'
            className={css(style.link)}
            activeClassName={css(style.activeLink)}
          >
            About Us
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {
  backgroundColor: PropTypes.oneOf(Object.keys(backgroundColourToBackgroundColorMap)),
  backgroundColour: PropTypes.oneOf([
    'navy',
    'greyLightest',
    'charcoal',
    'midRed',
    'white'
  ])
}

module.exports = Header
