  import React, { useState } from 'react';
  import { Form, Input, Button, message, Upload, Image, Space } from 'antd';
  import { useDispatch } from 'react-redux';
  // import { createEmployee } from '../../Redux/Action/employeeAction';
  import { createEmployee } from '../../Redux/Slice/employeeSlice';
  import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
  import { useAuthContext } from '../../Hook/useAuthContext';

  const { Dragger } = Upload;

  const CreateEmployeeForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { user } = useAuthContext();
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPhotos, setCoverPhotos] = useState([]);

    const onFinish = async (formValues) => {
      try {
        const formData = new FormData();
    
        // Append form values to formData
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });
    
        // Append profilePicture separately
        formData.append('profilePicture', profilePicture);
    
        // Append each cover photo
        coverPhotos.forEach((photo) => {
          formData.append(`coverPhotos`, photo); // Append the file path or URL directly
        });
      
        dispatch(createEmployee({employeeData:formData, userToken:user.token})); // Send FormData to action creator
    
        message.success('Employee created successfully');
        form.resetFields();
        setProfilePicture(null); // Reset profile picture to null
        setCoverPhotos([]); // Reset cover photos to an empty array
      } catch (error) {
        console.error('Error creating employee:', error.message);
        message.error(error.message || 'Failed to create employee');
      }
    };

    const handleProfilePictureChange = (info) => {
      if (info.file.status === 'done') {
        setProfilePicture(info.file.originFileObj);
      }
    };

    const handleCoverPhotoRemove = (index) => {
      const updatedCoverPhotos = [...coverPhotos];
      updatedCoverPhotos.splice(index, 1);
      setCoverPhotos(updatedCoverPhotos);
    };

    const uploadCoverPhotoProps = {
      name: 'file',
      showUploadList: false,
      beforeUpload: file => {
        if (file.type.includes('image')) {
          // Add the file directly to the coverPhotos state
          setCoverPhotos([...coverPhotos, file]);
        } else {
          message.error('Please upload only image files.');
        }
        return false;
      },
    };

    return (
      <Form
        name="createEmployee"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter the name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              message: 'Please enter the position',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[
            {
              required: true,
              message: 'Please enter the department',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="salary"
          label="Salary"
          rules={[
            {
              required: true,
              message: 'Please enter the salary',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Profile Picture">
          <Space direction="vertical">
            {profilePicture ? (
              <div>
                <Image src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <Button onClick={() => setProfilePicture(null)}>Remove</Button>
              </div>
            ) : (
              <Dragger
                name="file"
                showUploadList={false}
                beforeUpload={(file) => {
                  if (file.type.includes('image')) {
                    setProfilePicture(file);
                  }
                  return false;
                }}
                accept="image/*"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag image to this area to upload</p>
              </Dragger>
            )}
          </Space>
        </Form.Item>

        <Form.Item label="Cover Photos">
          <Space direction="vertical">
            {coverPhotos.map((photo, index) => (
              <div key={index}>
                <Image src={URL.createObjectURL(photo)} alt={`Cover Photo ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <Button onClick={() => handleCoverPhotoRemove(index)} icon={<DeleteOutlined />}>Remove</Button>
              </div>
            ))}
            <Dragger {...uploadCoverPhotoProps} accept="image/*">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag images to this area to upload</p>
            </Dragger>
          </Space>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Employee
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default CreateEmployeeForm;

