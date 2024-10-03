import { LoadingOutlined } from '@ant-design/icons'
import React, { memo } from 'react'

const Loading = () => {
  return (
    <LoadingOutlined className='text-blue-900 text-[60px]' />
  )
}

export default memo(Loading)