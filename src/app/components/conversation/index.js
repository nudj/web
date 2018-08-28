const React = require('react')

const { css } = require('@nudj/components/lib/css')
const styleSheet = require('./style.css')
const Citation = require('../citation')
const WobblyBox = require('../wobbly-box')

const Message = ({ displayPicture, name, recipient, children }) => (
  <div
    className={css(
      styleSheet.message,
      recipient ? styleSheet.recipient : styleSheet.sender
    )}
  >
    <Citation
      Component='div'
      side={recipient ? 'left' : 'right'}
      image={displayPicture}
      name={name}
    />
    <WobblyBox style={styleSheet.body} backgroundColor={recipient ? 'greyLightest' : 'primary'}>
      {children}
    </WobblyBox>
  </div>
)

const Conversation = ({ style, conversation, ...rest }) => (
  <div {...rest} className={css(style, styleSheet.root)}>
    {conversation.map((message, i) => (
      <Message
        key={i}
        displayPicture={message.displayPicture}
        name={message.name}
        recipient={message.recipient}
      >
        {message.body}
      </Message>
    ))}
  </div>
)

module.exports = Conversation
