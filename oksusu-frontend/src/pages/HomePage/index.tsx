import React, { useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

const HomePage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [questions, setQuestions] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            alert('파일 첨부부터 먼저 하숑~');
            return;
        }

        setLoading(true); // 요청 전 로딩 시작
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("https://api.oksusu-question-extractor.store/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: '#333' }}>옥수수의 보고서 질문 추출기</h2>
            <input type="file" onChange={handleFileChange} accept=".pdf,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style={{ display: 'block', margin: '20px 0' }} />
            <button onClick={uploadFile} style={{ background: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>질문 추출하기</button>
            {loading ? <Spin /> : questions && (
                <div style={{ marginTop: '20px', background: '#f7f7f7', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#555' }}>Questions:</h3>
                    <p style={{ color: '#666', whiteSpace: 'pre-line' }}>{questions}</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
