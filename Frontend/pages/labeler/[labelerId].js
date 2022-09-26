import { useRouter } from 'next/router';
import styled from 'styled-components';

function labelerDetail() {
  return ();


  const router = useRouter();
  const labelerId = router.query.labelerId;

  return (
    <Wrap>
      {labelerId}
      <div>
        진행중인 테스크
        <div>
          <div>Task Name3</div>
          <div>Task Name2</div>
          <div>Task Name54</div>
          <div>Task Name71</div>
        </div>
      </div>
    </Wrap>
  );
}


const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
  export default labelerDetail;