import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN, enUS } from '@mui/material/locale';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Test() {
  const { t, i18n } = useTranslation();

  // Tạo theme dựa trên ngôn ngữ hiện tại
  const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#1976d2',
        },
      },
    },
    i18n.language === 'vi' ? viVN : enUS, // Áp dụng locale tương ứng
  );

  // Cập nhật theme khi ngôn ngữ thay đổi
  useEffect(() => {
    console.log('Ngôn ngữ đã thay đổi:', i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h4">{t('welcome')}</Typography>
        <Typography variant="subtitle1">{t('changeLanguage')}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => changeLanguage('en')}
            disabled={i18n.language === 'en'}
          >
            {t('english')}
          </Button>
          <Button
            variant="contained"
            onClick={() => changeLanguage('vi')}
            disabled={i18n.language === 'vi'}
          >
            {t('vietnamese')}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Test;