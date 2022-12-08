import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../util/hook'
import { MdOutlineError } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import './toast.scss'

export function ToastMessage({ keyMessage }: any) {
  const { axiosMessage } = useTypedSelector((state) => state.stateReducer)
  const [displayDiv, setDisplayDiv] = useState('')

  const filterMessage = axiosMessage.filter((ele: any) => {
    return ele.key === keyMessage
  })

  function showToast() {
    if (filterMessage !== null || axiosMessage.length === 0) {
      setDisplayDiv("inline-flex")
    } else {
      setDisplayDiv("none")
    }
  }

  useEffect(() => {
    showToast()
  }, [axiosMessage])

  return (
    <div className='toast-main'>
      {filterMessage.map((ele: any) => (
        <div className='toast-class' style={{ display: displayDiv }}>
          {ele.status === "error"
            ?
            <>
              <MdOutlineError style={{ fontSize: '20px' }} /> <span>{ele.value}</span>
            </>
            :
            <>
              <TiTick style={{ fontSize: '20px', color: "#4FB087" }} /> <span>{ele.value}</span>
            </>
          }
        </div>
      ))}
    </div>
  )
}
