import { supabase } from "../../lib/supabase";
import LaptopGuidesClient from "./LaptopGuidesClient";

export default async function LaptopGuidesPage() {
  const { data: laptops, error } = await supabase
    .from("laptops")
    .select(
      "id, brand, family, model, model_number, release_year, verification_status"
    )
    .order("brand", { ascending: true })
    .order("model", { ascending: true });

  if (error) {
    console.error("Error fetching laptop guides:", error);
  }

  return <LaptopGuidesClient laptops={laptops ?? []} />;
}
