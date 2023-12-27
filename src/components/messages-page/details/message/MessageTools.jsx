// Functions
import copyToClipboard from "copy-to-clipboard"
// Hooks
import { useState } from "react"
// Constants
import { BACKEND_ON } from "../../constants/MessagesConstants"

const MessageTools = (props) => {
  // ==============  Props   ==============
  const messageId = props.messageId
  const messageMedia = props.messageMedia
  const messageText = props.messageText
  const hideMsgTools = props.hideMsgTools
  const msgToolsPositionX = props.msgToolsPositionX
  const msgToolsPositionY = props.msgToolsPositionY
  const visibiltyStyle = props.visibiltyStyle

  // ==============  Data   ==============
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertVTimeOut, setAlertVTimeOut] = useState(null)

  // ==============  Functions   ==============
  const handleCopy = () => {
    hideMsgTools()
    copyToClipboard(`${messageText ? messageText : ""}${messageText && messageMedia ? `\n` : ""}${messageMedia ? messageMedia : ""}`)
    clearTimeout(alertVTimeOut)
    setIsAlertVisible(true)
    setAlertVTimeOut(
      setTimeout(() => {
        setIsAlertVisible(false)
      }, 2250)
    )
  }

  return (
    <>
      <div className={`message-tools ${msgToolsPositionY === "T" ? "to-top" : "to-bottom"} ${msgToolsPositionX === "L" ? "to-left" : "to-right"}`} style={{ display: visibiltyStyle }}>
        <ul>
          <li className="copy-tool" onClick={handleCopy}>
            <div className="tool-content">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M15 6v3h3v2h-3v3h-2v-3h-3V9h3V6h2zm4.5-4C20.88 2 22 3.12 22 4.5v11c0 1.38-1.12 2.5-2.5 2.5h-11C7.12 18 6 16.88 6 15.5v-11C6 3.12 7.12 2 8.5 2h11zM8 15.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5h-11c-.28 0-.5.22-.5.5v11zm-4 4V8h-.5C2.67 8 2 8.67 2 9.5v10C2 20.88 3.12 22 4.5 22h10c.83 0 1.5-.67 1.5-1.5V20H4.5c-.28 0-.5-.22-.5-.5z"></path>
                  </g>
                </svg>
              </div>
              <div className="tool-text">Copy message</div>
            </div>
          </li>
        </ul>
      </div>
      {isAlertVisible && <div className="message-copied-pop">Copied to clipboard</div>}
    </>
  )
}

export default MessageTools
