import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  // const defaultMessage = intl.formatMessage({
  //   id: 'app.copyright.produced',
  //   defaultMessage: '蚂蚁集团体验技术部出品',
  // });
  const defaultMessage = 'Produced by GalaXeek Team. ';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Front End: React + umi.js + antd-pro',
          title: 'Front End',
          href: 'https://github.com/frederickszk/galaxeek-frontend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/frederickszk/galaxeek-frontend',
          blankTarget: true,
        },
        {
          key: 'Back End: Django + REST',
          title: 'Back End',
          href: 'https://github.com/frederickszk/galaxeek-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
