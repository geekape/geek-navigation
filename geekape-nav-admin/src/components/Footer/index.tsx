import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const defaultMessage = '极客猿导航';
  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[]}
    />
  );
};
