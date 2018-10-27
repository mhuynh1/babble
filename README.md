# aaand another chat app
see it live here: [babble](https://babble-fe8b7.firebaseapp.com/)

## App Features
- direct messaging
- private group messaging
- authenticated sessions
- google + github login with firebase oauth
- add emoji reactions to messages
- assigned avatar pic if no profile pic provided

## Technologies Used
- react
- redux/react-redux
- react router
- firebase/react-rebase
- firebase/oauth
- aphrodite for CSS in JS

## App structure
```
|--App
|   |--SignIn
|   |--Main
|   |     |--SidedrawerContent
|   |     |   |--UserInfo
|   |     |   |   |--Avatar
|   |     |   |   |--SignOutButton
|   |     |   |--RoomList
|   |     |   |   |--RoomLink
|   |     |   |   |--NotificationsBadge
|   |     |   |--DmList
|   |     |       |--RoomLink
|   |     |       |--NotificationsBadge
|   |     |--Backdrop
|   |     |--Chat
|   |     |    |--ChatHeader
|   |     |    |   |--SidedrawerToggle
|   |     |    |--MessageList
|   |     |    |   |--Message
|   |     |    |       |--Avatar
|   |     |    |       |--Metadata
|   |     |    |       |--EmojiPicker
|   |     |    |--MessageForm
|   |--RoomDmForm
|        |--MultipleSelectInput
|        |--NewRoomInputs
```
