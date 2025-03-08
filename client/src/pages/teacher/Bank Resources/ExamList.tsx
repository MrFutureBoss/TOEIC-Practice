import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Upload, message } from 'antd';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ExamList() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);

    // Kiểm tra nếu file đã upload thành công
    if (file.status === 'done') {
      // Log ra message và data từ response
      if (file.response) {
        console.log("Message:", file.response.message);
        console.log("Data:", file.response.datas);
      }
    } else if (file.status === 'error') {
      console.error("Upload failed:", file.error);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          action="http://localhost:9999/api/files/upload/image"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>

      <Upload
        action="http://localhost:9999/api/files/upload/image"
        listType="picture"
        fileList={fileList}
        onChange={onChange}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>

      <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  );
}