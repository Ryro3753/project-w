import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Feature } from "../models/feature.model";
import { TraitWithFeature } from "../models/traits.model";
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class FeatureService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Feature')
  }

  getSections(): Promise<string[]> {
    return this.get<string[]>("GetSections");
  }

  getTypes() {
    return this.get("GetTypes");
  }

  getTypesForRequirements() {
    return this.get("GetTypesForRequirements");
  }

  readValidFeatures(allFeatures: Feature[], allTraits: TraitWithFeature[]): Feature[] {
    if(allFeatures.length == 0)
      return [];

    let validFeatures = [] as Feature[];
    let loop = true;

    while (loop) {
      let thisTime = [] as Feature[];
      let allFeaturesCopy = JSON.parse(JSON.stringify(allFeatures)) as Feature[];

      let allFeaturesIndex = 0;

      while (allFeaturesIndex < allFeaturesCopy.length) {
        //Checking requirements of the feature
        let data = JSON.parse(JSON.stringify(allFeaturesCopy[allFeaturesIndex]));
        let requirementPassed = false;
        //There are requirements
        if (data.Requirements != [] && data.Requirements && data.Requirements != null && data.Requirements.length > 0) {
          let requirements: boolean[] = [];
          requirements = new Array(data.Requirements.length).fill(false);

          let requirementIndex = 0;

          //Checking requirements, all of them to be true
          while (requirementIndex < data.Requirements.length) {
            const requirement = data.Requirements[requirementIndex];
            //Checking if requirement value is an integer
            if (!isNaN(Number(requirement.Value))) {
              const index = validFeatures.findIndex(i => i.Section == requirement.Section && i.Type == requirement.Type
                && Number(i.Value) >= Number(requirement.Value));
              if (index != -1)
                requirements[requirementIndex] = true;
            }
            else {
              const index = validFeatures.findIndex(i => i.Section == requirement.Section && (i.Type == requirement.Type || (requirement.Type == 'Check' && i.Type == 'Gain'))
                && i.Value.toLowerCase() == requirement.Value.toLowerCase());
              if (index != -1)
                requirements[requirementIndex] = true;
            }
            requirementIndex++;
          }
          requirementPassed = requirements.every(i => i == true);
        }
        if (data.Requirements == [] || data.Requirements == null || !data.Requirements || data.Requirements.length == 0 || requirementPassed) {
          //Checking if value type is an integer, if so add them 
          if (!isNaN(Number(data.Value))) {
            const index = thisTime.findIndex(i => i.Section == data.Section && i.Type == data.Type && !isNaN(Number(i.Value)));
            if (index == -1)
              thisTime.push(data);
            else
              thisTime[index].Value = (Number(thisTime[index].Value) + Number(data.Value)).toString();
          }
          else{
            thisTime.push(data);
            if(data.Section == 'Trait' && data.Type == 'Gain'){
              const traitIndex = allTraits.findIndex(i => i.Name == data.Value);
              if(traitIndex != -1 && allTraits[traitIndex].Features != [] && allTraits[traitIndex].Features != null){
                allFeaturesCopy.push(...allTraits[traitIndex].Features)
              }
            }
          }
        }
        allFeaturesIndex++;
      }
      loop = JSON.stringify(validFeatures) !== JSON.stringify(thisTime);
      validFeatures = JSON.parse(JSON.stringify(thisTime));
    }
    return validFeatures;
  }

  readValidFeatures2(allFeatures: Feature[]): Feature[] {
    if(allFeatures.length == 0)
      return [];

    let validFeatures = [] as Feature[];
    let loop = true;

    while (loop) {
      let thisTime = [] as Feature[];

      let allFeaturesIndex = 0;

      while (allFeaturesIndex < allFeatures.length) {
        //Checking requirements of the feature
        let data = JSON.parse(JSON.stringify(allFeatures[allFeaturesIndex]));
        let requirementPassed = false;
        //There are requirements
        if (data.Requirements != [] && data.Requirements && data.Requirements != null && data.Requirements.length > 0) {
          let requirements: boolean[] = [];
          requirements = new Array(data.Requirements.length).fill(false);

          let requirementIndex = 0;

          //Checking requirements, all of them to be true
          while (requirementIndex < data.Requirements.length) {
            const requirement = data.Requirements[requirementIndex];
            //Checking if requirement value is an integer
            if (!isNaN(Number(requirement.Value))) {
              const index = validFeatures.findIndex(i => i.Section == requirement.Section && i.Type == requirement.Type
                && Number(i.Value) >= Number(requirement.Value));
              if (index != -1)
                requirements[requirementIndex] = true;
            }
            else {
              const index = validFeatures.findIndex(i => i.Section == requirement.Section && (i.Type == requirement.Type || (requirement.Type == 'Check' && i.Type == 'Gain'))
                && i.Value.toLowerCase() == requirement.Value.toLowerCase());
              if (index != -1)
                requirements[requirementIndex] = true;
            }
            requirementIndex++;
          }
          requirementPassed = requirements.every(i => i == true);
        }
        if (data.Requirements == [] || data.Requirements == null || !data.Requirements || data.Requirements.length == 0 || requirementPassed) {
          //Checking if value type is an integer, if so add them 
          if (!isNaN(Number(data.Value))) {
            const index = thisTime.findIndex(i => i.Section == data.Section && i.Type == data.Type && !isNaN(Number(i.Value)));
            if (index == -1)
              thisTime.push(data);
            else
              thisTime[index].Value = (Number(thisTime[index].Value) + Number(data.Value)).toString();
          }
          else{
            thisTime.push(data);
          }
        }
        allFeaturesIndex++;
      }
      loop = JSON.stringify(validFeatures) !== JSON.stringify(thisTime);
      validFeatures = JSON.parse(JSON.stringify(thisTime));
    }
    return validFeatures;
  }


}