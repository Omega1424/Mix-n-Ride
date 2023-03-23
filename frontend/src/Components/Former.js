import { Form } from "react-bootstrap"
import {Button} from "react-bootstrap"
import './Form.css'
const Apper = ()=> {
  const onFormSubmit = e => {
          e.preventDefault()
          const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries())
          console.log(formDataObj)

          
        }
  
  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Control type="text" name="start" />
        <div className='dot-design'>.<br/>.<br/>.<br/>.<br/>.<br/>.<br/></div>
      <Form.Control type="text" name="end" />
      <Button type="submit">
        Submit
      </Button>
    </Form>
  )
}


export default Apper;
  