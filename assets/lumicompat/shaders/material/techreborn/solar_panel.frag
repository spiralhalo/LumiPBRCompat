#include lumiext:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumiext:shaders/internal/frag.glsl

/*****************************************************
  lumicompat:shaders/material/techreborn/solar_panel.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
  if (data.vertexNormal.y > 0.9) {

    vec2 spriteUV = frx_var1.zw;
    vec2 e1 = 1.0-step(0.0625, spriteUV);
    vec2 e2 = step(1.0-0.0625, spriteUV);
    vec2 e = max(e1, e2);
    float frameness = max(e.x, e.y);
    if (frameness > 0) {
      #ifdef LUMI_BUMP
      #ifdef LUMIEXT_ApplyBumpDefault
      _applyBump(data);
      #endif
      #endif
    } else {
      #ifdef LUMI_PBRX
      pbr_roughness = 0.1;
      #endif
    }

  } else {

    vec3 c = data.spriteColor.rgb;
    float min_ = min( min(c.r, c.g), c.b );
    float max_ = max( max(c.r, c.g), c.b );
    float s = max_ > 0 ? (max_ - min_) / max_ : 0;
    data.emissivity = smoothstep(0.3, 0.5, s);

    #ifdef LUMI_PBRX
    float l = frx_luminance(c);
    if (l >= 0.15) {
      pbr_metallic = frx_smootherstep(0.5, 0.15, s) * (1.0 - l);
      pbr_roughness = 0.5;
    } else {
      pbr_roughness = 0.1;
    }
    #endif

    #ifdef LUMI_BUMP
    #ifdef LUMIEXT_ApplyBumpDefault
    _applyBump(data);
    #endif
    #endif
  }
}
