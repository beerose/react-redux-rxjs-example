/** @jsx jsx */
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { jsx } from "@emotion/core";
import { Todo } from "../types";
import { Store } from "antd/lib/form/interface";
import { useRef } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
};

type DynamicFieldSetProps = {
  onSubmit: (value: { names: string[] }) => void;
};
export const DynamicFieldSet: React.FC<DynamicFieldSetProps> = ({
  onSubmit
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: { names: string[] }) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish as (v: Store) => void}
      css={{
        "*": {
          marginLeft: 0
        }
      }}
    >
      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input todo's name or delete this field."
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder="todo name" style={{ width: "100%" }} />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{ margin: "0 8px" }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "100%" }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button
          type="ghost"
          htmlType="submit"
          css={{
            marginBottom: 0
          }}
        >
          Add items
        </Button>
      </Form.Item>
    </Form>
  );
};
