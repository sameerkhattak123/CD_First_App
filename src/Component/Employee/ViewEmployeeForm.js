import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Image, Space,message } from 'antd';
import { useDispatch } from 'react-redux';
// import { updateEmployee } from '../../Redux/Action/employeeAction';
import { updateEmployee } from '../../Redux/Slice/employeeSlice';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../Hook/useAuthContext';

const { Dragger } = Upload;

const ViewEmployeeForm = ({ employee, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [profilePicture, setProfilePicture] = useState(null);
  const [initialProfilePicture, setInitialProfilePicture] = useState(employee.profilePicture);
  const [initialCoverPicture, setInitialCoverPicture] = useState(employee.coverPhotos);
  const [coverPhotos, setCoverPhotos] = useState([]);

  useEffect(() => {
    setInitialProfilePicture(employee.profilePicture);
    setInitialCoverPicture(employee.coverPhotos);
  
    // Reset coverPhotos state whenever the employee prop changes
    setCoverPhotos([]);
    
    // Initialize coverPhotos state only if it's not already populated
    if (employee.coverPhotos && !employee.coverPhotos.some(photo => coverPhotos.some(cp => cp.url === photo))) {
      // Map each cover photo URL to an object with `url` and `file` properties
      const mappedCoverPhotos = employee.coverPhotos.map(photoUrl => ({ url: photoUrl, file: null }));
      setCoverPhotos(mappedCoverPhotos);
    }
  
    form.setFieldsValue(employee);
  }, [employee]);
  
  

  

  const handleFinish = async (values) => {
    const updatedData = { ...values };
    const formData = new FormData();

    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    coverPhotos.forEach((photo) => {
      
      formData.append('coverPhotos', photo.file || photo.url);
      console.log('photo',photo);
    });
    


    dispatch(updateEmployee({employeeId:employee._id, updatedData:formData, userToken: user.token}));
    onClose();
  };


  const handleCancel = () => {
    // setProfilePicture(initialProfilePicture);
    setCoverPhotos(initialCoverPicture.map(photoUrl => ({ url: photoUrl, file: null }))); 
    onClose();
  };

  const handleCoverPhotoRemove = (indexToRemove) => {
    setCoverPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  

 

  const handleCoverPhotoBeforeUpload = async (file) => {
    if (file.type.includes('image')) {
      // Convert file to data URL
      const dataURL = await fileToDataURL(file);
      // Update coverPhotos state with URL
      setCoverPhotos((prevPhotos) => [...prevPhotos, { url: dataURL, file }]);
    } else {
      message.error('Please upload only image files.');
    }
    return false;
  };

  const uploadCoverPhotoProps = {
    showUploadList: false,
    beforeUpload: handleCoverPhotoBeforeUpload,
    accept: 'image/*',
  };

  const uploadProfilePictureProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.type.includes('image')) {
        setProfilePicture(file);
      } else {
        message.error('Please upload only image files.');
      }
      return false;
    },
    accept: 'image/*',
  };

  return (
    <Form
      form={form}
      initialValues={employee}
      onFinish={handleFinish}
      layout="vertical"
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Position" name="position" rules={[{ required: true, message: 'Please enter the position' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please enter the department' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Salary" name="salary" rules={[{ required: true, message: 'Please enter the salary' }]}>
        <Input type="number" />
      </Form.Item>
      
      <Form.Item label="Profile Picture">
        <Space direction="vertical">
          <div>
            {profilePicture ? (
              <Image src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            ) : (
              <Image src={initialProfilePicture} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            )}
          </div>
          <Dragger {...uploadProfilePictureProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Space>
      </Form.Item>

      <Form.Item label="Cover Photos">
        <Space direction="vertical">
        {coverPhotos.map((photo, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Image src={photo.file ? URL.createObjectURL(photo.file) : photo.url} alt={`Cover ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleCoverPhotoRemove(index)}
            />
          </div>
        ))}
          
          <Dragger {...uploadCoverPhotoProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Space>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Update Employee
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ViewEmployeeForm;
