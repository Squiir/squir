import { Image, Text, View } from 'react-native'
import { AvatarProps } from '@types/avatar'

export function Avatar({ uri, username, size = 80 }: AvatarProps) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size }}
        className="rounded-full"
      />
    )
  }

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center bg-gray-300 rounded-full dark:bg-gray-700"
    >
      <Text className="text-3xl font-bold text-white">
        {username[0]?.toUpperCase()}
      </Text>
    </View>
  )
}
