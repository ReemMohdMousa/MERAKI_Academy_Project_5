<>
<div className="messenger">
  <div className="chatMenu">
    <div className="chatMenuWrapper">
      {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
      <h4>your conversations</h4>
      {conversations?.map((element) => {
        return (
          <div
            key={element._id}
            onClick={() => {
              dispatch(setTheOpenedConversation(element));

              //determine the receiver_id
              // const receiver_id = element.members.find(
              //   (member) => member != userId
              // );

              //navigate to current conversation
              // navigate(`/messenger/${userId}/${receiver_id}`);
            }}
          >
            <Conversation
              Oneconversation={element}
              theOpenedConversation={theOpenedConversation}
            />
          </div>
        );
      })}
    </div>
  </div>
  <div className="chatBox">
    <div className="chatBoxWrapper">
      <div>
        <h4>
          {theOpenedConversation &&
            friendInfo &&
            friendInfo?.firstname + " " + friendInfo?.lastname}
        </h4>
      </div>
      <>
        {theOpenedConversation ? (
          <div>
            <div className="chatBoxTop">
              {messages.map((element) => {
                // console.log(element);
                return (
                  <div>
                    <Message
                      message={element}
                      mine={element.sender == userId ? true : false}
                      theOpenedConversation={theOpenedConversation}
                      friendInfo={friendInfo}
                    />
                  </div>
                );
              })}
            </div>
            <div className="chatBoxBottom">
              <input
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => {
                  // console.log(e.target.value);
                  setNewWrittenMessage(e.target.value);
                }}

                // value={newMessage}
              ></input>
              <button className="chatSubmitButton" onClick={SendNewMsg}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="noConversationText">"Open a conversation"</div>
        )}
      </>
    </div>
  </div>
  <div className="chatOnline">
    <div className="chatOnlineWrapper">
      <OnlineFriends onlineUsers={onlineUsers} />
    </div>
  </div>
</div>
</>