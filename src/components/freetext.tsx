import { Component } from 'react'

interface Props {
  label: string
  name?: string
  text?: string
}

export class Freetext extends Component<Props> {
  render() {
    const id = `textarea-${this.props.name}`
    return (
      <div className='freetext-parent'>
        <label className='freetext-child' htmlFor={id}>{this.props.label}:</label>
        <textarea
          className='freetext-child'
          id={id}
          name={id}
          rows={4}
          cols={50}
        >{this.props.text}</textarea>
      </div >
    )
  }
}
