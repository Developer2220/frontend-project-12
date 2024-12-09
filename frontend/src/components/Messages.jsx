import useFetch from "../hooks/useFetch"

const Messages = () => {
  const messages = useFetch('/messages')
  console.log('messages.data in Messages', messages.data)

    return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        <div className="text-break mb-2">
            <b>Автор сообщения</b>
            Текст сообщения
        </div>
    </div>
  )
}

export default Messages