import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const defaultMessage = '极客猿出品';
  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[]}
    />
  );
};
