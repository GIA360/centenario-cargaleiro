import { HeroLogo } from "@/components/home/HeroLogo";
import { Manifesto } from "@/components/home/Manifesto";
import { Missoes } from "@/components/home/Missoes";
import { ProjetosIndex } from "@/components/home/ProjetosIndex";
import { CronogramaSecao } from "@/components/home/CronogramaSecao";

export default function HomePage() {
  return (
    <>
      <HeroLogo />
      <Manifesto />
      <Missoes />
      <ProjetosIndex />
      <CronogramaSecao />
    </>
  );
}
