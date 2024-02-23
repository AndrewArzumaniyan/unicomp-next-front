import React, { FC, useState } from "react";
import Modal from "../modal/Modal";
import Link from "next/link";
import styles from "./FeedbackModal.module.scss";

interface ModalProps {
  visible: boolean;
  delVisible: () => void;
}

const FeedbackModal: FC<ModalProps> = ({visible, delVisible}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    category: '',
    mark: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://uni-comp.kz/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Форма успешно отправлена');
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }

    delVisible();
    setFormData({
      full_name: '',
      category: '',
      mark: '',
      email: '',
      message: ''
    })
  };


  return (
    <Modal visible={visible} delVisible={delVisible} className={`${styles['feedback-modal']}`} modalClose={false}>
      <div className={styles['feedback-modal-box']}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="full_name">ФИО:</label><br />
          <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required /><br />
          <label htmlFor="category">Категория:</label><br />
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Выберите категорию</option>
            <option value="жалоба">Жалоба</option>
            <option value="предложение">Предложение</option>
            <option value="отзыв">Отзыв</option>
          </select><br />
          <label htmlFor="mark">Оценка (от 0 до 5):</label><br />
          <input type="number" id="mark" name="mark" min="0" max="5" value={formData.mark} onChange={handleChange} required /><br />
          <label htmlFor="email">Ваш email:</label><br />
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
          <label htmlFor="message">Ваше сообщение:</label><br />
          <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required></textarea><br />
          <input type="submit" value="Отправить" />
        </form>
      </div>
    </Modal>
  );
}

export default FeedbackModal;
