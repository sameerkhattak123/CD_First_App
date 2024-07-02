import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPdf } from '../../Redux/Slice/pdfToTextSlice';
import { Upload, Button, message, Spin, Input } from 'antd';
import { UploadOutlined, CopyOutlined } from '@ant-design/icons';


const PdfUploader = () => {
    const dispatch = useDispatch();
    const { text, status, error } = useSelector((state) => state.pdf);

    const handleUpload = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleBeforeUpload = (file) => {
        dispatch(uploadPdf(file));
        return false; // Prevent automatic upload by Upload component
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('Text copied to clipboard!');
        }).catch(() => {
            message.error('Failed to copy text.');
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <Upload
                beforeUpload={handleBeforeUpload}
                onChange={handleUpload}
                maxCount={1}
                accept=".pdf"
            >
                <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>

            {status === 'loading' && <Spin tip="Extracting text..." style={{ marginTop: '20px' }} />}

            {status === 'succeeded' && (
                <div style={{ marginTop: '20px' }}>
                    <Input.TextArea
                        value={text}
                        rows={10}
                        readOnly
                        style={{ marginBottom: '20px' }}
                    />
                    <Button icon={<CopyOutlined />} onClick={handleCopy}>
                        Copy Text
                    </Button>
                </div>
            )}

            {status === 'failed' && <div style={{ color: 'red' }}>Error: {error}</div>}
        </div>
    );
};

export default PdfUploader;
