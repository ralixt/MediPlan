import ModelingGenerator from "@/components/modelingGenerator";
import { cache } from "react";
import fs from "fs/promises";
import generate from "@/utils/generator";
import { WorkshopButtonOneIcon } from "@/components/buttons";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import "./scrollbar.css";
import {
  deleteAllParcoursType,
  getAllParcoursType,
  getParcoursType,
} from "@/actions/ParcoursType";
import { Loader } from "@/components/loader";
import { param } from "ts-interface-checker";
import { ModelingGeneratorMenu } from "@/components/modelingGeneratorMenu";
import DownloadParcours from "@/components/telechargement";

type props = {
  uid: string;
};

export type NextPageProps<T = Record<string, string>> = {
  /**
   * The path parameters received
   * e.g. : page/[slug] --> params.slug
   */
  params: T;
  /**
   * The HTTP query parameters received
   * e.g. : my-page?page=1&order=asc --> searchParams.page and searchParams.order
   */
  searchParams: { [key: string]: string | string[] | undefined };
};

const getParcours = cache(async () => {
  const responseBDD = await getAllParcoursType();

  const response = await fs.readFile("./public/temporary/BDD.json", "utf-8");
  const data: parcoursList = JSON.parse(response);
  //console.log(data[0])
  return data[0];
});

export default async function ModelingWorkshop({
  params,
}: NextPageProps<props>) {
  let elements = null;
  //const parcours = await getParcours();
  //console.log(parcours)
  const parcours = await getParcoursType(params.modelingWorkshop);
  if (parcours !== undefined) {
    elements = generate(parcours);
    //console.log(elements);
  }
  //console.log(parcours, elements);
  return elements == undefined && parcours == undefined ? (
    <Loader></Loader>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-lightlightgrey">
      <div className="w-full flex flex-row items-center content-center justify-between mt-6 pr-8 pl-12">
        <WorkshopButtonOneIcon
          href="/modeling-workshop-menu"
          icon={<ArrowLeft size={24} />}
          classname=" bg-lightgrey transition-all duration-300 ease-in-out hover:rounded-full w-14 h-14 rounded-2xl flex items-center content-center justify-center"
          // absolute top-6 left-24
        />
        <h1 className=" text-3xl font-bold">{parcours.name}</h1>
        <DownloadParcours parcours={parcours}></DownloadParcours>
      </div>

      <ModelingGenerator element={elements} parcour={parcours} />
    </div>
  );
}
