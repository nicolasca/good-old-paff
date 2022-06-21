import styled from "styled-components";
import FlancCoco from "../../assets/images/home/flan-coco.png";
import Fleches from "../../assets/images/home/fleches.png";
import MangeursRiz from "../../assets/images/home/mangeurs-riz.png";
import NerfLiches from "../../assets/images/home/nerf-liches.png";
import Samourai from "../../assets/images/home/samourai.png";

const Phrases = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30%;
`;

export default function Home() {
  return (
    <div>
      <h1>Le PAFF en 5 phrases</h1>
      <Phrases>
        <img src={FlancCoco} alt="Flanc coco" />
        <img src={Fleches} alt="Flanc coco" />
        <img src={MangeursRiz} alt="Flanc coco" />
        <img src={NerfLiches} alt="Flanc coco" />
        <img src={Samourai} alt="Flanc coco" />
      </Phrases>
    </div>
  );
}
