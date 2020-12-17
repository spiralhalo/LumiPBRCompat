#include lumi:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumi:shaders/lib/apply_bump.glsl

/**************************************************************
  lumicompat:shaders/material/techreborn/stone_reinforced.frag
***************************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
#ifdef LUMI_BUMP
#ifdef LUMI_BUMP_MINERALS
  vec2 spriteUV = frx_var1.zw;
  vec2 e1 = 1.0-step(0.25, spriteUV);
  vec2 e2 = step(1.0-0.25, spriteUV);
  vec2 e = max(e1, e2);
  float frameness = max(e.x, e.y);
  if (frameness > 0) {
    _applyBump(data);
  }
#ifdef LUMI_PBR
  if (frameness > 0) {
    pbr_metallic = 1.0;
    pbr_roughness = 0.5;
  } else {
    pbr_roughness = 0.7;
  }
#endif
#endif
#endif
}
