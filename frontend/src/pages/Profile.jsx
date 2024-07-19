import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Profile() {
  return (
    <div style={{width: '50%'}}>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Salaire</Form.Label>
        <Form.Control type="text" placeholder="" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Categorie name</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Budget</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
);
}

export default Profile