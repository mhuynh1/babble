# yes, another chat app
see it live here: [babble](https://babble-fe8b7.firebaseapp.com/)


## Technologies Used
- React
- Redux/react-redux
- Firebase/react-rebase
- Firebase/oauth

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
