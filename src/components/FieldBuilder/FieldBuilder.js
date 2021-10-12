import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../../styles/FieldBuilder/FieldBuilder.css";

// Returns the implementation of a FieldBuilder form component
const FieldBuilder = () => {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("multi");
  const [required, setRequired] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const [choices, setChoices] = useState();
  const [text, setText] = useState();
  const [displayAlpha, setDisplayAlpha] = useState("true");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      label,
      type,
      required,
      choices: addDefaultChoice(),
      displayAlpha,
      defaultValue,
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://www.mocky.io/v2/566061f21200008e3aabd919", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(this.responseText);
        console.log(data);
      }
    };
    xhr.send(data);
  };

  const addDefaultChoice = () => {
    if (choices === undefined) {
      return [defaultValue];
    } else if (!choices.includes(defaultValue) && defaultValue.length > 0) {
      return [...choices, defaultValue];
    } else {
      return choices;
    }
  };

  const handleCancel = (e) => {
    setLabel("");
    setText("");
    setType("multi");
    setRequired(true);
    setChoices("");
    setDisplayAlpha("true");
    setDefaultValue("");
  };

  const handleTextArea = (e) => {
    setText(e.target.value);
    setChoices(
      e.target.value.split("\n").filter(function (item, pos, self) {
        return self.indexOf(item) === pos && pos < 50 && item.length > 0;
      })
    );
  };

  return (
    <div className="form">
      <Modal dialogClassName="field-modal" show={true}>
        <Modal.Header>
          <Modal.Title>Field Builder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="Form" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Label
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="title"
                  placeholder="Enter Label"
                  value={label}
                  required
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Type
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="multi">Multi-select</option>
                  <option value="single">Single-select</option>
                </Form.Control>{" "}
              </Col>
              <Col sm={5}>
                <Form.Check
                  type="checkbox"
                  label="Value is required"
                  value={required}
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Default Value
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  placeholder="Enter Default Option"
                  value={defaultValue}
                  onChange={(e) => {
                    setDefaultValue(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Choices
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={text}
                  placeholder="Enter choices here, separate choices by a new line."
                  onChange={handleTextArea}
                />{" "}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Order
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  value={displayAlpha}
                  onChange={(e) => setDisplayAlpha(e.target.value)}
                >
                  <option value="true">
                    Display choices in Alphabetical Order
                  </option>
                  <option value="false">
                    Do not display in Alphabetical Order
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <div className="buttonContainer">
              <Button className="button" variant="primary" type="submit">
                Submit
              </Button>
              <div id="centeredY">or</div>
              <Button id="buttonCancel" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FieldBuilder;
